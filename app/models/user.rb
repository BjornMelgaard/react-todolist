class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :projects

  def projects_with_nestings
    options = { include: ['tasks.comments.attachments'] }
    serialization = ActiveModelSerializers::SerializableResource.new(projects, options)
    serialization.to_json
  end
end
