from yapp.daos.base_dao import BaseDAO
from yapp.models.item.item_atributo import ItemAtributo


class ItemAtributoDAO(BaseDAO):
    def get_clase(self):
        return ItemAtributo