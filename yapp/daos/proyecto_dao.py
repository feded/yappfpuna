from yapp.daos.base_dao import BaseDAO
from yapp.models.proyecto.proyecto import Proyecto

class ProyectoDAO(BaseDAO):
    def get_clase(self):
        return Proyecto

