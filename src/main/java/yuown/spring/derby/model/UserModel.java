package yuown.spring.derby.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import yuown.spring.derby.security.YuownGrantedAuthority;

import java.util.ArrayList;

public class UserModel extends Model {

	private static final long serialVersionUID = 2733430016846177569L;

	private String username;

	private String password;

	private boolean enabled;

	private String fullName;

	private long expires;
	
	private String lastLogin;
	
	private ArrayList<YuownGrantedAuthority> authorities;

	public String getPassword() {
		return password;
	}

	public boolean isEnabled() {
		return enabled;
	}

	public String getFullName() {
		return fullName;
	}

	public void setUsername(String userName) {
		this.username = userName;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getUsername() {
		return this.username;
	}

	public String getLastLogin() {
        return lastLogin;
    }

    public void setLastLogin(String lastLogin) {
        this.lastLogin = lastLogin;
    }

    @JsonIgnore
	public boolean isAccountNonExpired() {
		return this.enabled;
	}

	@JsonIgnore
	public boolean isAccountNonLocked() {
		return this.enabled;
	}

	@JsonIgnore
	public boolean isCredentialsNonExpired() {
		return this.enabled;
	}

	public void setExpires(long l) {
		this.expires = l;
	}

	public long getExpires() {
		return expires;
	}

	public void setAuthorities(ArrayList<YuownGrantedAuthority> authorities) {
		this.authorities = authorities;
	}

	public ArrayList<YuownGrantedAuthority> getAuthorities() {
		return authorities;
	}
}
