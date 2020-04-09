package com.boco.eoms.picture_custom.base.util;

/**
 * Description: 静态方法转换类
 * Copyright:   Copyright (c)2017
 * Company:     BOCO 
 * @author:     szy
 * @version:    1.0 
 * Create at:   2017-04-10
 */
public class StaticMethod {
	
	/**
	 * classpath标识
	 */
	public final static String CLASSPATH_FLAG = "classpath:";
	/**
	 * 日期格式
	 */
	public static final String DATE_FORMAT = "yyyy-MM-dd HH:mm:ss";
	
	/**
	 * 字符转换函数
	 * @param s 需要转换的对象
	 * @return str:如果字符串为null,返回为空,否则返回该字符串
	 */
	public static String nullObject2String(Object s) {
		String str = "";
		try {
			str = s.toString();
		} catch (Exception e) {
			str = "";
		}
		return str;
	}
	
	/**
	 * 将一个对象转换为String
	 * 
	 * @param s
	 * @param chr
	 * @return
	 */
	public static String nullObject2String(Object s, String chr) {
		String str = chr;
		try {
			str = s.toString();
		} catch (Exception e) {
			str = chr;
		}
		return str;
	}
	
	/**
	 * 将一个对象转换为整形
	 * 
	 * @param s
	 * @return
	 */
	public static int nullObject2int(Object s) {
		String str = "";
		int i = 0;
		try {
			str = s.toString();
			i = Integer.parseInt(str);
		} catch (Exception e) {
			i = 0;
		}
		return i;
	}
	
	/**
	 * 将对象转换为整形
	 * 
	 * @param s
	 * @param in
	 * @return
	 */
	public static int nullObject2int(Object s, int in) {
		String str = "";
		int i = in;
		try {
			str = s.toString();
			i = Integer.parseInt(str);
		} catch (Exception e) {
			i = in;
		}
		return i;
	}
	
	/**
	 * 对象转换为long型
	 * 
	 * @param s
	 * @return
	 */
	public static long nullObject2Long(Object s) {
		long i = 0;

		String str = "";
		try {
			str = s.toString();
			i = Long.parseLong(str);
		} catch (Exception e) {
			i = 0;
		}

		return i;
	}

	/**
	 * 将对象转换为long,如果无法转换则返回temp
	 * 
	 * @param s
	 * @param temp
	 * @return
	 */
	public static long nullObject2Long(Object s, long temp) {
		long i = temp;

		String str = "";
		try {
			str = s.toString();
			i = Long.parseLong(str);
		} catch (Exception e) {
			i = temp;
		}

		return i;
	}
}
