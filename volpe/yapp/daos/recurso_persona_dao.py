from yapp.daos.base_dao import BaseDAO
from yapp.models.recurso.recurso_persona import RecursoPersona

class RecursoPersonaDAO(BaseDAO):
    def get_clase(self):
        return RecursoPersona;