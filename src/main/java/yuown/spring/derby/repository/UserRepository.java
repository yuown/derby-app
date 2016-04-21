package yuown.spring.derby.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import yuown.spring.derby.entities.User;

@Repository
public interface UserRepository extends BaseRepository<User, Integer> {

    public User findByUsername(String userName);
    
    @Query("select max(id) from User")
	public Integer findMaxId();
}
