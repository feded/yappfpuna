"""
Pasos para ejectuar este archivo.
1. Crear un entorno virtual
2. Activarlo
3. Instalar el paquete postgresql-devel
4. etc.
"""
import os

from setuptools import setup, find_packages

here = os.path.abspath(os.path.dirname(__file__))
README = open(os.path.join(here, 'README.txt')).read()
CHANGES = open(os.path.join(here, 'CHANGES.txt')).read()

requires = [
    'pyramid',
    'SQLAlchemy',
    'transaction',
    'pyramid_tm',
#    'pyramid_debugtoolbar',
    'zope.sqlalchemy',
    'waitress',
    'jsonpickle',
#    'psycopg2',
    'pyramid_mailer',
    'webtest'
    ]

setup(name='yapp',
      version='0.0',
      description='yapp',
      long_description=README + '\n\n' +  CHANGES,
      classifiers=[
        "Programming Language :: Python",
        "Framework :: Pylons",
        "Topic :: Internet :: WWW/HTTP",
        "Topic :: Internet :: WWW/HTTP :: WSGI :: Application",
        ],
      author='',
      author_email='',
      url='',
      keywords='web wsgi bfg pylons pyramid',
      packages=find_packages(),
      include_package_data=True,
      zip_safe=False,
      test_suite='yapp',
      install_requires=requires,
      entry_points="""\
      [paste.app_factory]
      main = yapp:main
      [console_scripts]
      initialize_yapp_db = yapp.scripts.initializedb:main
      """,
      )

