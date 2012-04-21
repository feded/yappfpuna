from yapp.daos.base_dao import BaseDAO
from yapp.models.tipo_item.atributo_tipo_item import AtributoTipoItem 
class AtributoTipoItemDAO(BaseDAO):
    def get_clase(self):
        return AtributoTipoItem