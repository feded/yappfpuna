from yapp.daos.base_dao import BaseDAO
from yapp.models.recurso.recurso_material import RecursoMaterial

class RecursoMaterialDAO(BaseDAO):
    def get_clase(self):
        return RecursoMaterial;