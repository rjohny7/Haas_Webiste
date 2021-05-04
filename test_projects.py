from api import db,Projects,Project
import pytest_check as check

def test_projects():
    x = Projects()
    x.post("test1","Test project",456)

    #testing whether project is added to database
    p1 = Project.query.filter_by(id=456).first()
    check.equal(p1.description,"Test project")

    #testing project get function
    p2 = x.get(project_id=456)
    check.equal(p1.name,p2['name'])

    x.post("test2","New test project",345)

    #testing whether project is added to database
    p1 = Project.query.filter_by(id=345).first()
    check.equal(p1.name,"test2")

    #testing project get function
    p2 = x.get(project_id=345)
    check.equal(p1.description,p2['description'])