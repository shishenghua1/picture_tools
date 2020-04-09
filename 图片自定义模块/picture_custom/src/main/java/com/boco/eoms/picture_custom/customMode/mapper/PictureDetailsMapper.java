package com.boco.eoms.picture_custom.customMode.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.boco.eoms.picture_custom.customMode.model.PictureDetails;

@Mapper
public interface PictureDetailsMapper {
	
	public void saveData(PictureDetails pictureDetails);
	
	public int findCount(Map<String,Object> prama);
	
	public List<PictureDetails> findDataByParam(Map<String,Object> prama);
	
	public PictureDetails findData(String id);
	
	public void updateData(PictureDetails pictureDetails);
	
	public void deleteData(String id);

}
