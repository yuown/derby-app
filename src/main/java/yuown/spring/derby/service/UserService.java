package yuown.spring.derby.service;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.stereotype.Service;

import yuown.spring.derby.entities.User;
import yuown.spring.derby.model.UserModel;
import yuown.spring.derby.repository.UserRepository;
import yuown.spring.derby.security.YuownGrantedAuthority;
import yuown.spring.derby.transformer.UserTransformer;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
public class UserService extends AbstractServiceImpl<Integer, User, UserRepository> {

    @Value("#{'${SUPER_USERS}'.split(',')}")
    private List<String> SUPER_USERS;

    @Value("#{'${SUPER_GROUPS}'.split(',')}")
    private List<String> SUPER_GROUPS;

    @Value("#{'${valid.roles}'.split(',')}")
    private List<String> ALL_ROLES;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserTransformer userTransformer;

    @Autowired
    private JdbcUserDetailsManager jdbcUserDetailsManager;

    @Override
    public UserRepository repository() {
        return userRepository;
    }
    
    public void initUsers() {
        UserModel user = findByUsername(SUPER_USERS.get(0));
        if(null == user) {
            user = new UserModel();
            user.setUsername(SUPER_USERS.get(0));
            user.setPassword(SUPER_USERS.get(0));
            user.setFullName(SUPER_USERS.get(0));
            user.setEnabled(true);
            user.setAuthorities(userTransformer.transformAdminAuthorities(ALL_ROLES));
            try {
                createUser(user);
                addUserToGroup(user.getUsername(), SUPER_GROUPS.get(0));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    public UserModel getByUsername(String name) {
        org.springframework.security.core.userdetails.User userFromDB = (org.springframework.security.core.userdetails.User) jdbcUserDetailsManager.loadUserByUsername(name);
        UserModel user = userTransformer.transformFromSecurityUser(userFromDB);
        User dbUser = userRepository.findByUsername(name);
        user.setId(dbUser.getId());
        user.setFullName(dbUser.getFullName());
        if (SUPER_USERS.contains(name)) {
            user.setAuthorities(userTransformer.transformAdminAuthorities(ALL_ROLES));
        }
        return user;
    }

    public UserModel findByUsername(String username) {
        return userTransformer.transformTo(userRepository.findByUsername(username));
    }

    public void createUser(UserModel fromClient) throws Exception {
        Integer maxId = userRepository.findMaxId();
        if(maxId == null) {
            maxId = 0;
        }
        fromClient.setId(maxId + 1);
        userRepository.save(userTransformer.transformFrom(fromClient));
    }

    public void removeUser(UserModel fromClient) {
        if (null != fromClient) {
            jdbcUserDetailsManager.deleteUser(fromClient.getUsername());
        }
    }

    public List<UserModel> getAll() {
        List<UserModel> allUsers = userTransformer.transformTo(super.findAll());
        for (Iterator<UserModel> iterator = allUsers.iterator(); iterator.hasNext();) {
            UserModel userModel = iterator.next();
            if (SUPER_USERS.contains(userModel.getUsername())) {
                iterator.remove();
            }
        }
        return allUsers;
    }

    public void enable(UserModel user) {
        if (null != user) {
            UserModel fromDB = findByUsername(user.getUsername());
            if (null != fromDB && user.isEnabled() != fromDB.isEnabled()) {
                fromDB.setEnabled(user.isEnabled());
                userRepository.save(userTransformer.transformFrom(fromDB));
            }
        }
    }

    public List<String> getAllAuthorities() {
        return ALL_ROLES;
    }

    public List<String> getGroups() {
        List<String> allGroups = jdbcUserDetailsManager.findAllGroups();
        allGroups.removeAll(SUPER_GROUPS);
        return allGroups;
    }

    public void createGroup(String groupName) {
        List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
        List<String> allGroups = jdbcUserDetailsManager.findAllGroups();
        groupName = groupName.toUpperCase();
        if (!allGroups.contains(groupName)) {
            jdbcUserDetailsManager.createGroup(groupName, authorities);
        }
    }

    public void deleteGroup(String groupName) {
        jdbcUserDetailsManager.deleteGroup(groupName);
    }

    public List<String> findGroupAuthorities(String groupName) {
        List<String> authorities = new ArrayList<String>();
        List<GrantedAuthority> auths = jdbcUserDetailsManager.findGroupAuthorities(groupName);
        for (GrantedAuthority grantedAuthority : auths) {
            authorities.add(grantedAuthority.getAuthority());
        }
        return authorities;
    }

    public void addOrRemoveGroupAuthority(String groupName, List<String> authoritiesFromClient) {
        List<String> authoritiesFromClientCopy = new ArrayList<String>();
        for (String string : authoritiesFromClient) {
            authoritiesFromClientCopy.add(string);
        }
        List<String> current = findGroupAuthorities(groupName);
        authoritiesFromClient.removeAll(current);
        for (String authority : authoritiesFromClient) {
            jdbcUserDetailsManager.addGroupAuthority(groupName, new YuownGrantedAuthority(authority));
        }
        current.removeAll(authoritiesFromClientCopy);
        for (String authority : current) {
            jdbcUserDetailsManager.removeGroupAuthority(groupName, new YuownGrantedAuthority(authority));
        }
    }

    public List<String> findUsersIngroup(String groupName) {
        return jdbcUserDetailsManager.findUsersInGroup(groupName);
    }

    public void addUserToGroup(String username, String groupName) {
        UserModel dbUser = findByUsername(username);
        if (dbUser != null) {
            jdbcUserDetailsManager.addUserToGroup(username, groupName);
        }
    }

    public void removeUserFromGroup(String username, String groupName) {
        UserModel dbUser = findByUsername(username);
        if (dbUser != null) {
            jdbcUserDetailsManager.removeUserFromGroup(username, groupName);
        }
    }

    public void updateUser(UserModel model) {
        userRepository.save(userTransformer.transformFrom(model));
    }

    public void updateUser(UserModel model, UserModel fromHeader) {
        model.setEnabled(true);
        if (StringUtils.isNotEmpty(model.getFullName())) {
            model.setFullName(model.getFullName().toUpperCase());
        } else {
            model.setFullName(fromHeader.getFullName());
        }
        if (StringUtils.isNotEmpty(model.getPassword())) {
            model.setPassword(model.getPassword());
        } else {
            model.setPassword(fromHeader.getPassword());
        }
        updateUser(model);
    }

    public UserModel getById(int id) {
        User user = userRepository.findById(id);
        if(null != user) {
            return userTransformer.transformTo(user);
        }
        return null;
    }
}
