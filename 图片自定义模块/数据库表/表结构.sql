
create table eoms_picture_tool
(
  id               VARCHAR(64) not null primary key COMMENT  '����id',
  name             VARCHAR(200)  COMMENT  'ͼƬ����',
  height           VARCHAR(32)  COMMENT  'ͼƬ�߶�',
  width            VARCHAR(32)  COMMENT  'ͼƬ���',
  background_color VARCHAR(32)  COMMENT  '������ɫ',
  icon_name        VARCHAR(64)  COMMENT  'ͼ������',
  icon_left_height VARCHAR(32)  COMMENT  'ͼ��λ�þ���',
  icon_top_height  VARCHAR(32)  COMMENT  'ͼ��λ�þ���',
  text             VARCHAR(64)  COMMENT  'ͼƬ����',
  font_size        VARCHAR(32)  COMMENT  '���ִ�С',
  font_typeface    VARCHAR(32)  COMMENT  '��������',
  font_color       VARCHAR(32)  COMMENT  '������ɫ',
  text_left_height VARCHAR(32)  COMMENT  '����λ�þ���',
  text_top_height  VARCHAR(32)  COMMENT  '����λ�þ���',
  border_width     VARCHAR(32)  COMMENT  'ͼƬ�߿���',
  border_color     VARCHAR(32)  COMMENT  'ͼƬ�߿���ɫ',
  create_time      datetime  COMMENT  '����ʱ��',
  create_userid    VARCHAR(64)  COMMENT  '������',
  type             VARCHAR(32)  COMMENT  'ͼƬ��������',
  icon_width       VARCHAR(32)  COMMENT  'ͼ����',
  icon_height      VARCHAR(32) COMMENT  'ͼ��߶�'
)
