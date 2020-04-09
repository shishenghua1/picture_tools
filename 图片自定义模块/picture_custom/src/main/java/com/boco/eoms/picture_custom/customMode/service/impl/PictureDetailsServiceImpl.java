package com.boco.eoms.picture_custom.customMode.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boco.eoms.picture_custom.customMode.mapper.PictureDetailsMapper;
import com.boco.eoms.picture_custom.customMode.model.PictureDetails;
import com.boco.eoms.picture_custom.customMode.service.PictureDetailsService;

@Service
public class PictureDetailsServiceImpl implements PictureDetailsService{
	@Autowired
	private PictureDetailsMapper pictureDetailsMapper;
	
	@Override
	public void saveData(PictureDetails pictureDetails) {
		
		pictureDetailsMapper.saveData(pictureDetails);
	}
	
	@Override
	public int findCount(Map<String, Object> prama) {
		
		return pictureDetailsMapper.findCount(prama);
	}
	
	@Override
	public List<PictureDetails> findDataByParam(Map<String, Object> prama) {
		int limit = Integer.parseInt((String) prama.get("limit"));
		int page = Integer.parseInt((String) prama.get("page"));
		int start = (page-1) * limit;
		int end = limit;
		prama.put("start", start);
		prama.put("end", end);
		return pictureDetailsMapper.findDataByParam(prama);
	}

	@Override
	public PictureDetails findData(String id) {
		
		return pictureDetailsMapper.findData(id);
	}

	@Override
	public void updateData(PictureDetails pictureDetails) {
		
		pictureDetailsMapper.updateData(pictureDetails);
	}

	@Override
	public void deleteData(String id) {
		
		pictureDetailsMapper.deleteData(id);
	}

}
