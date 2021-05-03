from flask import Flask,jsonify,request
from flask_restful import Resource, Api, reqparse
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import event
from werkzeug.security import check_password_hash, generate_password_hash
import os


app = Flask(__name__,static_folder='./build',static_url_path='/') 

#database setup
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///auth.db"
db = SQLAlchemy(app)


api = Api(app)


@app.route('/')
def index():    #load page from react
    return app.send_static_file('index.html')


class User(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    username = db.Column(db.String(20),unique=True,nullable=False)
    password = db.Column(db.String(20),nullable=False)
    credits = db.Column (db.Integer)
    checked_out = db.Column(db.Integer)
    # def __repr__(self):
    #     return f"User('{self.username}')"


class HWSets(db.Model):
    __tablename__='hardware'
    id = db.Column(db.Integer,primary_key=True)
    capacity = db.Column(db.Integer)
    availability = db.Column(db.Integer)


@event.listens_for(HWSets.__table__,'after_create')
def create_datasets(*args,**kwargLogs):
    db.session.add(HWSets(capacity=20,availability=20))
    db.session.add(HWSets(capacity=10,availability=10))
    db.session.commit()


class Project(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String(20),nullable=False)
    description = db.Column(db.Text,nullable=False)

    # def __repr__(self):
    #     return f'{self.id}{self.name}{self.description}'


class HardwareResources(Resource):

    def hardware_serialize(self,entry):
        return{
            "id": "HWSet " + str(entry.id),
            "capacity":entry.capacity,
            "amount":entry.availability
        }
    # get function that is called whenever we need to display the current hardware capacity for a hardware set
    def get(self, set_id, checkout, amount, username):
        # get database information for that hardware set
        entry = HWSets.query.all()
        return jsonify([self.hardware_serialize(i) for i in entry])

    # function for requesting hardware resources. called when someone sends request for checkout/checkin
    # checkout is a T/F variable for checkout and checkin respectively
    def post(self, set_id, checkout, amount, username):
        # get database information for that hardware set
        entry = HWSets.query.get(set_id)
        amount = int(amount)
        user = User.query.filter_by(username=username).first()
        if entry is not None:
            #set id is in the database, so we allow the checkout
            if checkout == "T" and entry.capacity >= amount:
                if user.credits >= amount:
                    user.credits -= amount
                    entry.availability -= amount
                    user.checked_out += amount
                    db.session.commit()
                else:
                    return "You do not have enough credits"
            #set id is in the database, so we allow the checkin
            elif checkout == "F":
                if (entry.availability + amount) > entry.capacity:
                    return "Exceeded hardware set capacity"
                elif amount > user.checked_out:
                    return "You cannot check in more units than you have checked out"
                else:
                    user.credits += amount
                    entry.availability += amount
                    user.checked_out -= amount
                    db.session.commit()
            else:
                return "Requested amount exceeds available hardware"
            return{
                "HWSet": entry.id,
                "capacity": entry.capacity,
                "availability": entry.availability,
                "credits": user.credits
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
        return "Not found"

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
                'project_id': project.id,
                'name': project.name,
                'description': project.description
            }
        return "Project id already exists"


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
            return {
                "username": username,
                "credits": entry.credits
            }
        return "Incorrect username or password"

    # function is called whenever someone is registering
    def post(self, username, password):
        hashed_password = generate_password_hash(password)
        entry = User.query.filter_by(username=username).first()
        if entry is None:
            user = User(username=username,password=hashed_password,credits=10,checked_out=0)  #new user have 10 free credits
            db.session.add(user)
            db.session.commit()
            return {
                "username": username,
                "credits": user.credits
            }
        return "Username is already taken"



# @app.route('/login',methods=['GET'])
# def login():
#     username = request.args["username"]
#         #hashed_password = check_password_hash(password)
#     entry = User.query.filter_by(username=username).first()
#     if entry is not None: #and check_password_hash(entry.password, password):
#         return{
#             "username":username
#         }
#     return "Incorrect username or password", 404


api.add_resource(HardwareResources, '/HardwareResources/<set_id>/<checkout>/<amount>/<username>')
api.add_resource(Projects, '/Projects/<name>/<description>/<project_id>')
api.add_resource(Datasets, '/Datasets/<dataset_id>')
api.add_resource(Login, '/Login/<username>/<password>')

if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=False,port=os.environ.get('PORT',80))
