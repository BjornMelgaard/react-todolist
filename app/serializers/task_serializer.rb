class TaskSerializer < ActiveModel::Serializer
  attributes :id, :name, :done, :deadline, :position

  has_many :comments
end
