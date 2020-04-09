package com.boco.eoms.picture_custom.base.filter;

import com.boco.eoms.picture_custom.base.oauth2.config.OAuth2Client;
import com.boco.eoms.picture_custom.base.util.StaticMethod;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author ssh
 * @description:
 * @date 2019/11/515:37
 */

@Component
@WebFilter(urlPatterns = "/picture/*", filterName = "pictureCustomFilter")
public class PictureCustomFilter implements Filter {

    private static final Logger logger = LoggerFactory.getLogger(PictureCustomFilter.class);

    public void init(FilterConfig arg0) throws ServletException {
        logger.info("---------------过滤器初始化---------------");
    }

/**
     * 拦截器实现
     * @param servletRequest
     * @param servletResponse
     * @param filterChain
     * @throws IOException
     * @throws ServletException
     */

    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
            throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response=(HttpServletResponse)servletResponse;
        String url = request.getRequestURI().substring(request.getContextPath().length());

        if(url.contains(".js")||url.contains(".css")||url.contains(".png")||url.contains(".gif")||url.contains(".xml")){
            filterChain.doFilter(servletRequest, servletResponse);
        }else{
            String access_token = request.getParameter("websit_token");
            //获取账户
            String userId = "";
            if(access_token!=null&&!"".equals(access_token)){
                userId = OAuth2Client.getUserId(access_token);
            }else{
                //获取session里的userId
                userId = StaticMethod.nullObject2String(SecurityContextHolder.getContext().getAuthentication().getName());
            }
            logger.info("访问的账户信息为:"+userId);
            if(url.contains("errorPage")||(!"anonymousUser".equals(userId)&&!"".equals(userId))){
                filterChain.doFilter(servletRequest, servletResponse);
            }else{
                logger.info("---------------访问失败---------------链接为"+url);
                servletRequest.getRequestDispatcher("errorPage").forward(servletRequest,
                        servletResponse);
            }
        }
    }

    public void destroy() {
        logger.info("---------------过滤器销毁了---------------");
    }

}
