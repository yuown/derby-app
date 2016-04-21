package yuown.spring.derby.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

import yuown.spring.derby.entities.BaseEntity;

import java.io.Serializable;
import java.util.List;

@NoRepositoryBean
public interface BaseRepository<E extends BaseEntity<ID>, ID extends Serializable> extends JpaRepository<E, ID> {

	public E findById(ID id);

	public List<E> findAllByEnabled(Boolean enabled);

}