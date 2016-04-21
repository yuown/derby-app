package yuown.spring.derby.transformer;

import yuown.spring.derby.entities.BaseEntity;
import yuown.spring.derby.model.Model;

import java.util.List;
import java.util.Set;

public interface DTOTransformer<From extends Model, To extends BaseEntity<?>> {

	public Set<To> transformFrom(Set<From> sources);

	public To transformFrom(From source);

	public From transformTo(To source);

	public Set<From> transformTo(Set<To> sources);

	public List<To> transformFrom(List<From> sources);

	public List<From> transformTo(List<To> sources);
}
