package com.boco.eoms.picture_custom.customMode.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.boco.eoms.picture_custom.base.util.StaticMethod;
import com.boco.eoms.picture_custom.base.util.UUIDUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;
import com.boco.eoms.picture_custom.customMode.model.PictureDetails;
import com.boco.eoms.picture_custom.customMode.service.PictureDetailsService;


/**
 *  图片自定义
 * @author lixingshan
 * @date 2018.08.25
 */

@Controller
@RequestMapping("/picture")
public class PictureDetailsController {

	@Autowired
	private PictureDetailsService pictureDetailsService;

	/*
	 *  访问主页面
	 * @param req
	 * @param resp
	 * @result String
	 */
	@RequestMapping(value="/main",method = RequestMethod.GET)
	public String main(HttpServletRequest req, HttpServletResponse resp) {
		return "main";
	}

	/*
	 *  访问错误信息页面
	 * @param req
	 * @param resp
	 * @param model
	 * @result String
	 */
	@RequestMapping(value="/errorPage",method = RequestMethod.GET)
	public String errorPage(HttpServletRequest req, HttpServletResponse resp) {
		return "errorHtml";
	}

	/*
	 *  访问图片自定义页面
	 * @param req
	 * @param resp
	 * @param model
	 * @result String
	 */
	@RequestMapping(value="/pictureCustom",method = RequestMethod.GET)
	public String pictureCustom(HttpServletRequest req, HttpServletResponse resp, Model model) {
		String id = req.getParameter("id");
		if(id == null || "".equals(id)) {
			id = "";
		}
		model.addAttribute("id", id);
		return "pictureCustom";
	}

	/*
	 *  保存/修改自定义图片详情数据
	 * @param req
	 * @param resp
	 * @result null
	 */
	@RequestMapping(value="/savePictureDetails",method = RequestMethod.POST)
	public void savePictureDetails(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		String id = req.getParameter("id");
		PictureDetails pictureDetails = new PictureDetails();
		if("".equals(id)) {
			pictureDetails.setId(UUIDUtil.getUUID());
		}else {
			pictureDetails.setId(req.getParameter("id"));
		}
		pictureDetails.setName(req.getParameter("name"));
		pictureDetails.setHeight(req.getParameter("picture-height"));
		pictureDetails.setWidth(req.getParameter("picture-width"));
		pictureDetails.setBackground_color(req.getParameter("background-color"));
		pictureDetails.setIcon_name(req.getParameter("picture-icon"));
		pictureDetails.setIcon_left_height(req.getParameter("icon-left-height"));
		pictureDetails.setIcon_top_height(req.getParameter("icon-top-height"));
		pictureDetails.setText(req.getParameter("text"));
		pictureDetails.setFont_size(req.getParameter("text-size"));
		pictureDetails.setFont_typeface(req.getParameter("text-typeFace"));
		pictureDetails.setFont_color(req.getParameter("text-color"));
		pictureDetails.setText_left_height(req.getParameter("text-left-height"));
		pictureDetails.setText_top_height(req.getParameter("text-top-height"));
		pictureDetails.setBorder_width(req.getParameter("border-width"));
		pictureDetails.setBorder_color(req.getParameter("border-color"));
		pictureDetails.setCretae_userid(SecurityContextHolder.getContext().getAuthentication().getName());
		pictureDetails.setType(req.getParameter("pictureType"));
		pictureDetails.setIcon_width(req.getParameter("icon-width"));
		pictureDetails.setIcon_height(req.getParameter("icon-height"));
		try {
			if("".equals(id)) {
				pictureDetailsService.saveData(pictureDetails);
			}else {
				pictureDetailsService.updateData(pictureDetails);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		/*resp.sendRedirect("pictureCustom");*/
	}

	/*
	 *  访问图片列表页面
	 * @param req
	 * @param resp
	 * @result String
	 */
	@RequestMapping(value="/pictureList",method = RequestMethod.GET)
	public String pictureList(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		return "pictureList";
	}

	/*
	 *  图片列表页数据查询
	 * @param req
	 * @param resp
	 * @result String
	 */
	@RequestMapping(value="/searchPictureList",method = RequestMethod.POST)
	@ResponseBody
	public String searchPictureList(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		String page = req.getParameter("page");
		String limit = req.getParameter("limit");
		String name = req.getParameter("name");
		if(name == null || "".equals(name)) {
			name = "";
		}
		String type = req.getParameter("type");
		if(type == null || "".equals(type)) {
			type = "";
		}
		String createTime = req.getParameter("createTime");
		if(createTime == null || "".equals(createTime)) {
			createTime = "";
		}
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("page", page);
		param.put("limit", limit);
		param.put("name", name);
		param.put("type", type);
		param.put("create_time", createTime);
		int count = pictureDetailsService.findCount(param);
		List<PictureDetails> pictureList = pictureDetailsService.findDataByParam(param);
		JSONObject job = new JSONObject();
		job.put("code", 0);
		job.put("msg", "\"\"");
		job.put("count", count);
		job.put("data", pictureList);
//		System.out.println(job.toString());
		return job.toString();
	}

	/*
	 *  图片修改查询
	 * @param req
	 * @param resp
	 * @result String
	 */
	@RequestMapping(value="/findPicture",method = RequestMethod.POST)
	@ResponseBody
	public String findPicture(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		String id = req.getParameter("id");
		PictureDetails pictureDetails = pictureDetailsService.findData(id);
		JSONObject job = new JSONObject();
		job.put("data", pictureDetails);
//		System.out.println(job.toString());
		return job.toString();
	}

	/*
	 *  图片删除
	 * @param req
	 * @param resp
	 * @result String
	 */
	@RequestMapping(value="/deletePicture",method = RequestMethod.POST)
	@ResponseBody
	public String deletePicture(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		String id = req.getParameter("id");
		String result = "";
		try {
			pictureDetailsService.deleteData(id);
			result = "true";
		} catch (Exception e) {
			result = "false";
			e.printStackTrace();
		}
		return result;
	}

}
