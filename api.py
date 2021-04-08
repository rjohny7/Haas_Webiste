from flask import Flask
from flask_restful import Resource, Api, reqparse
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import event
from werkzeug.security import check_password_hash, generate_password_hash
import os

#TODO: assign api to actual Flask app
#TODO: figure out if we store datasets in database and if not, write code for sending zip file
#TODO: determine how to run this with javascript and if it works without flask having a front end portion
#TODO: add checkin function for hardware resources

app = Flask(__name__) # replace this with actual app

#database setup
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///auth.db"
db = SQLAlchemy(app)


api = Api(app)
parser = reqparse.RequestParser()


class User(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    username = db.Column(db.String(20),unique=True,nullable=False)
    password = db.Column(db.String(20),nullable=False)

    # def __repr__(self):
    #     return f"User('{self.username}')"


class HWSets(db.Model):
    __tablename__='hardware'
    id = db.Column(db.Integer,primary_key=True)
    capacity = db.Column(db.Integer)


@event.listens_for(HWSets.__table__,'after_create')
def create_datasets(*args,**kwargLogs):
    db.session.add(HWSets(capacity=20))
    db.session.add(HWSets(capacity=10))
    db.session.commit()


class Project(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String(20),nullable=False)
    description = db.Column(db.Text,nullable=False)

    # def __repr__(self):
    #     return f'{self.id}{self.name}{self.description}'


class HardwareResources(Resource):
    # get function that is called whenever we need to display the current hardware capacity for a hardware set
    def get(self, set_id):
        # get database information for that hardware set
        entry = HWSets.query.get(set_id)
        if entry is not None:
            return{
                "HWSet": entry.id,
                "capacity":entry.capacity
            }
        return "Not found", 404

    # function for requesting hardware resources. called when someone sends request for checkout/checkin
    # checkout is a T/F variable for checkout and checkin respectively
    def post(self, set_id):
        parser.add_argument("checkout")
        parser.add_argument("amount")
        args = parser.parse_args()
        # get database information for that hardware set
        entry = HWSets.query.get(set_id)
        if entry is not None:
            #set id is in the database, so we allow the checkout
            if args['checkout'] == "T":
                #db.write(set_id, entry['capacity'] - int(args['amount']))
                entry.capacity -= int(args['amount'])
                db.session.commit()
            #set id is in the database, so we allow the checkin
            else:
                #db.write(set_id, entry['capacity'] + int(args['amount']))
                entry.capacity -= int(args['amount'])
                db.session.commit()
            return{
                "HWSet": entry.id,
                "capacity":entry.capacity
            }
        return "Not found", 404


class Projects(Resource):
    # get function that is called whenever we need to use an existing project for a user
    def get(self, name, description, project_id):
        #parser.add_argument("project_id")
        #args = parser.parse_args()
        # get database information for that project id
        entry = Project.query.get(project_id)
        if entry is not None:
            return {
                'project_id':entry.id,
                'name':entry.name,
                'description':entry.description
            }
        return "Not found", 404

    # post function that is called whenever someone tries to create a new project
    def post(self, name, description, project_id):
        #parser.add_argument("name")
        #parser.add_argument("description")
        #parser.add_argument("project_id")
        #args = parser.parse_args()
        entry = Project.query.get(project_id)
        if entry is None:
            #db.create(args['project_id'], args['name'], args['description'])
            project = Project(id=project_id,name=name,description=description)
            db.session.add(project)
            db.session.commit()
            return {
                'project_id':project.id,
                'name':project.name,
                'description':project.description
            }
        return "Project id already exists", 404 #plus some error code if needed


class Datasets(Resource):
    # get function that is called whenever someone requests to download dataset
    def get(self, dataset_id):
        entry = db.get(dataset_id)
        if entry is not None:
            # entry should be path to zip file?
            # send file code here if it is a file path
            # otherwise if database stores dataset directly, leave as is
            return entry
        return "Not found", 404


class Login(Resource):
    # get function that is called whenever someone is logging in
    def get(self, username, password):
        #hashed_password = check_password_hash(password)
        entry = User.query.filter_by(username=username).first()
        if entry is not None and check_password_hash(entry.password, password):
            return username
        return "Incorrect username or password", 404

    # function is called whenever someone is registering
    def post(self, username, password):
        hashed_password = generate_password_hash(password)
        entry = User.query.filter_by(username=username).first()
        if entry is None:
            user = User(username=username,password=hashed_password)
            db.session.add(user)
            db.session.commit()
            return username, 200
        return "Username is already taken", #plus some error code if needed


api.add_resource(HardwareResources, '/HardwareResources/<set_id>')
api.add_resource(Projects, '/Projects/<name>/<description>/<project_id>')
api.add_resource(Datasets, '/Datasets/<dataset_id>')
api.add_resource(Login, '/Login/<username>/<password>')

app.run()


