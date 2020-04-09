package com.boco.eoms.picture_custom.customMode.service;

import java.util.List;
import java.util.Map;

import com.boco.eoms.picture_custom.customMode.model.PictureDetails;
/**
 * 图片数据处理接口
 * @author lixingshan
 * @date 2018.08.25
 */
public interface PictureDetailsService {
	
	/*
	 * 保存自定义图片详情数据
	 * @param pictureDetails
	 */
	public void saveData(PictureDetails pictureDetails);
	
	/*
	 * 根据参数获取总数
	 * @param prama
	 */
	public int findCount(Map<String,Object> prama);
	
	/*
	 * 根据参数查询数据集合
	 * @param prama
	 */
	public List<PictureDetails> findDataByParam(Map<String,Object> prama);
	
	/*
	 * 根据数据id查找数据
	 * @param prama
	 */
	public PictureDetails findData(String id);
	
	/*
	 * 更新图片详情数据
	 * @param pictureDetails
	 */
	public void updateData(PictureDetails pictureDetails);
	
	/*
	 * 删除数据
	 * @param id
	 */
	public void deleteData(String id);

}
