from pyramid.paster import get_appsettings, setup_logging
from sqlalchemy import engine_from_config
from yapp.models import Base, DBSession
import yapp.models.roles.rol
import yapp.models.roles.tipo_rol
import yapp.models.roles.privilegio
#from yapp.models.roles import *

import os
import sys


def usage(argv):
    cmd = os.path.basename(argv[0])
    print('usage: %s <config_uri>\n'
          '(example: "%s development.ini")' % (cmd, cmd)) 
    sys.exit(1)

def main(argv=sys.argv):
    if len(argv) != 2:
        usage(argv)
    config_uri = argv[1]
    setup_logging(config_uri)
    settings = get_appsettings(config_uri)
    engine = engine_from_config(settings, 'sqlalchemy.')
    DBSession.configure(bind=engine)
    Base.metadata.create_all(engine)
#    with transaction.manager:
#        model = Page('FrontPage3', 'This is the front page')
#        DBSession.add(model)
#        privilegio = Privilegios('FrontPage2', 'This is the front page')
#        DBSession.add(privilegio)
