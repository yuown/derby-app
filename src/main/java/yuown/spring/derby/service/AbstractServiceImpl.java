package yuown.spring.derby.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.transaction.annotation.Transactional;

import yuown.spring.derby.entities.BaseEntity;
import yuown.spring.derby.repository.BaseRepository;

import java.io.Serializable;
import java.util.HashMap;
import java.util.List;

@Transactional
public abstract class AbstractServiceImpl<ID extends Serializable, E extends BaseEntity<ID>, R extends BaseRepository<E, ID>> {

    public abstract R repository();

    public E save(E entity, HashMap<String, Object> customParams) throws Exception {
        return repository().save(entity);
    }

    public List<E> findAll() {
        return repository().findAll();
    }
    
    public List<E> findAll(Boolean enabled) {
        return repository().findAllByEnabled(enabled);
    }

    public void delete(E entity) {
        repository().delete(entity);
    }

    public List<E> saveAll(List<E> entities) {
        return repository().save(entities);
    }

    public E findById(ID id) {
        return repository().findOne(id);
    }

    public Page<E> search(String name, Integer page, Integer size) {
        if (page == null || page < 0) {
            page = 0;
        }

        Integer fromSystem = 10;
        try {
            fromSystem = Integer.parseInt(System.getProperty("page.size"));
        } catch (Exception e) {
        }
        if (size == null || (size < 0 || size > fromSystem)) {
            size = fromSystem;
        }
        PageRequest pageRequest = new PageRequest(page, size);
        return repository().findAll(pageRequest);
    }
}