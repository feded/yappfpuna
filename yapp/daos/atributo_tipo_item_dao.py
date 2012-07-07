from yapp.daos.base_dao import BaseDAO
from yapp.models.tipo_item.atributo_tipo_item import AtributoTipoItem 
class AtributoTipoItemDAO(BaseDAO):
    def get_clase(self):
        return AtributoTipoItem
    
    
    def get_atributos_by_tipo_id(self, tipo_id):
        return self.get_query().filter(AtributoTipoItem._tipo_item_id == tipo_id).all()