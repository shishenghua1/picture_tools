package com.boco.eoms.picture_custom.base.util;

import java.util.UUID;

/**
 * 
 * 32ID
 * @author congyuzi
 *
 */
public class UUIDUtil {
	
	public static String getUUID(){
		return UUID.randomUUID().toString().replaceAll("-", "");
	}

}
