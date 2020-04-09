package com.boco.eoms.picture_custom.base.oauth2.config;

import com.alibaba.fastjson.JSONObject;
import com.boco.eoms.picture_custom.base.oauth2.Oauth2ServerProps;
import com.boco.eoms.picture_custom.base.oauth2.model.PrincipalUser;
import com.boco.eoms.picture_custom.base.oauth2.model.UserAuthentication;
import org.apache.commons.httpclient.Header;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.NameValuePair;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.params.HttpMethodParams;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

@Component
public class OAuth2Client {
	
	private static Oauth2ServerProps oauth2ServerProps;
	
	@Autowired
    public OAuth2Client(Oauth2ServerProps oauth2ServerProps) {
		OAuth2Client.oauth2ServerProps=oauth2ServerProps;
	    	
    }

	private static final Logger logger = LoggerFactory.getLogger(OAuth2Client.class);
	
	public static String getUserId(String token) {
		String szReturn = "";
		if (!token.equals("")) {
			HttpClient client = new HttpClient();
			String url = "http://"+oauth2ServerProps.getIp()+":"+oauth2ServerProps.getPort()+"/v1/user/me";
			GetMethod get = new GetMethod(url);
			List<NameValuePair> nameValuePairList = new ArrayList<NameValuePair>();
			// nameValuePairList.add(new NameValuePair("state",state));

			NameValuePair[] nameValuePairArray = new NameValuePair[nameValuePairList
					.size()];
			nameValuePairList.toArray(nameValuePairArray);

			get.setQueryString(nameValuePairArray);
			get.getParams().setParameter(HttpMethodParams.HTTP_CONTENT_CHARSET,
					"UTF-8");
			try {
				List<Header> headers = new ArrayList<Header>();
				headers.add(new Header("Authorization", OAuthConstants.BEARER
						+ " " + token));
				headers.add(new Header("Accept", OAuthConstants.JSON_CONTENT));
				client.getHostConfiguration().getParams().setParameter(
						"http.default-headers", headers);
				int status = client.executeMethod(get);
				if (status >= 400) {
					throw new RuntimeException(
							"Could not access protected resource. Server returned http code: "
									+ status);
				}
				
				String result = get.getResponseBodyAsString() != null ? get
						.getResponseBodyAsString().trim() : "";
				logger.debug(result);
				
				PrincipalUser user = JSONObject.toJavaObject(JSONObject.parseObject(result), PrincipalUser.class);
				UserAuthentication userAuthentication = JSONObject.toJavaObject(JSONObject.parseObject(result), UserAuthentication.class);
				szReturn = user.getName();
				SecurityContextHolder.getContext().setAuthentication(userAuthentication);
				return szReturn;
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
				throw new RuntimeException(e.getMessage());
			} catch (Throwable t) {
				t.printStackTrace();
			}
		}
		return szReturn;
	}
}
