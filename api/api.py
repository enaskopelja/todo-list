from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api, Resource, fields, marshal_with
import json

app = Flask(__name__)
api = Api(app)
CORS(app)

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = r'sqlite:///C:\Users\Ena\PycharmProjects\react_test\todo.db'
db = SQLAlchemy(app)

todo_fields = {
    'id': fields.Integer,
    'text': fields.String,
    'done': fields.Boolean,
}


class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(100))
    done = db.Column(db.Boolean, default=False)

    @staticmethod
    def get(id: int) -> 'Todo':
        return Todo.query.filter_by(id=id).first()


class TodoResource(Resource):

    @marshal_with(todo_fields)
    def get(self, id: int):
        return Todo.get(id)

    def patch(self, id: int):
        todo = Todo.get(id)
        todo.done = True
        db.session.commit()
        return self.get(id)

    def delete(self, id: int):
        Todo.query.filter_by(id=id).delete()
        db.session.commit()
        return {}


class TodosResource(Resource):

    @marshal_with(todo_fields)
    def get(self):
        return Todo.query.all()

    @marshal_with(todo_fields)
    def post(self):
        todo = Todo(**request.get_json())
        db.session.add(todo)
        db.session.commit()
        return Todo.get(todo.id)

    def patch(self):
        for query in Todo.query.all():
            query.done = True
        db.session.commit()
        return self.get()

    def delete(self):
        query = Todo.query.filter_by(done=True)
        query.delete()
        db.session.commit()
        return self.get()


api.add_resource(TodosResource, '/api/todos', endpoint='todos')
api.add_resource(TodoResource, '/api/todos/<int:id>', endpoint='todo')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port='8080', debug=True)