package com.boco.eoms.picture_custom.customMode.model;

import java.io.Serializable;
import java.util.Date;

public class PictureDetails implements Serializable{
	
	private String id;
	private String name;
	private String height;
	private String width;
	private String background_color;
	private String icon_name;
	private String icon_left_height;
	private String icon_top_height;
	private String text;
	private String font_size;
	private String font_typeface;
	private String font_color;
	private String text_left_height;
	private String text_top_height;
	private String border_width;
	private String border_color;
	private Date create_time;
	private String cretae_userid;
	private String type;
	private String icon_width;
	private String icon_height;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getHeight() {
		return height;
	}
	public void setHeight(String height) {
		this.height = height;
	}
	public String getWidth() {
		return width;
	}
	public void setWidth(String width) {
		this.width = width;
	}
	public String getBackground_color() {
		return background_color;
	}
	public void setBackground_color(String background_color) {
		this.background_color = background_color;
	}
	public String getIcon_name() {
		return icon_name;
	}
	public void setIcon_name(String icon_name) {
		this.icon_name = icon_name;
	}
	public String getIcon_left_height() {
		return icon_left_height;
	}
	public void setIcon_left_height(String icon_left_height) {
		this.icon_left_height = icon_left_height;
	}
	public String getIcon_top_height() {
		return icon_top_height;
	}
	public void setIcon_top_height(String icon_top_height) {
		this.icon_top_height = icon_top_height;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public String getFont_size() {
		return font_size;
	}
	public void setFont_size(String font_size) {
		this.font_size = font_size;
	}
	public String getFont_typeface() {
		return font_typeface;
	}
	public void setFont_typeface(String font_typeface) {
		this.font_typeface = font_typeface;
	}
	public String getFont_color() {
		return font_color;
	}
	public void setFont_color(String font_color) {
		this.font_color = font_color;
	}
	public String getText_left_height() {
		return text_left_height;
	}
	public void setText_left_height(String text_left_height) {
		this.text_left_height = text_left_height;
	}
	public String getText_top_height() {
		return text_top_height;
	}
	public void setText_top_height(String text_top_height) {
		this.text_top_height = text_top_height;
	}
	public String getBorder_width() {
		return border_width;
	}
	public void setBorder_width(String border_width) {
		this.border_width = border_width;
	}
	public String getBorder_color() {
		return border_color;
	}
	public void setBorder_color(String border_color) {
		this.border_color = border_color;
	}
	public Date getCreate_time() {
		return create_time;
	}
	public void setCreate_time(Date create_time) {
		this.create_time = create_time;
	}
	public String getCretae_userid() {
		return cretae_userid;
	}
	public void setCretae_userid(String cretae_userid) {
		this.cretae_userid = cretae_userid;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getIcon_width() {
		return icon_width;
	}
	public void setIcon_width(String icon_width) {
		this.icon_width = icon_width;
	}
	public String getIcon_height() {
		return icon_height;
	}
	public void setIcon_height(String icon_height) {
		this.icon_height = icon_height;
	}
	
	@Override
	public String toString() {
		return "PictureDetails [id=" + id + ", name=" + name + ", height=" + height + ", width=" + width
				+ ", background_color=" + background_color + ", icon_name=" + icon_name + ", icon_left_height="
				+ icon_left_height + ", icon_top_height=" + icon_top_height + ", text=" + text + ", font_size="
				+ font_size + ", font_typeface=" + font_typeface + ", font_color=" + font_color + ", text_left_height="
				+ text_left_height + ", text_top_height=" + text_top_height + ", border_width=" + border_width
				+ ", border_color=" + border_color + ", create_time=" + create_time + ", cretae_userid=" + cretae_userid
				+ ", type=" + type + ", icon_width=" + icon_width + ", icon_height=" + icon_height + "]";
	}
	
	
}
