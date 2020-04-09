
create table eoms_picture_tool
(
  id               VARCHAR(64) not null primary key COMMENT  '主键id',
  name             VARCHAR(200)  COMMENT  '图片名称',
  height           VARCHAR(32)  COMMENT  '图片高度',
  width            VARCHAR(32)  COMMENT  '图片宽度',
  background_color VARCHAR(32)  COMMENT  '背景颜色',
  icon_name        VARCHAR(64)  COMMENT  '图标名称',
  icon_left_height VARCHAR(32)  COMMENT  '图标位置距左',
  icon_top_height  VARCHAR(32)  COMMENT  '图标位置距上',
  text             VARCHAR(64)  COMMENT  '图片文字',
  font_size        VARCHAR(32)  COMMENT  '文字大小',
  font_typeface    VARCHAR(32)  COMMENT  '文字字体',
  font_color       VARCHAR(32)  COMMENT  '文字颜色',
  text_left_height VARCHAR(32)  COMMENT  '文字位置距左',
  text_top_height  VARCHAR(32)  COMMENT  '文字位置距上',
  border_width     VARCHAR(32)  COMMENT  '图片边框宽度',
  border_color     VARCHAR(32)  COMMENT  '图片边框颜色',
  create_time      datetime  COMMENT  '创建时间',
  create_userid    VARCHAR(64)  COMMENT  '创建人',
  type             VARCHAR(32)  COMMENT  '图片保存类型',
  icon_width       VARCHAR(32)  COMMENT  '图标宽度',
  icon_height      VARCHAR(32) COMMENT  '图标高度'
)
