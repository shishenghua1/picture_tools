package com.boco.eoms.picture_custom.base.oauth2.model;

/**
 * @author ssh
 * @description:用户对象
 * @date 2019/10/3115:15
 */
public class EomsSystemUser {

    /**
     * 用户名称
     */
    private String userName;

    /**
     * 用户密码
     */
    private String password;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
