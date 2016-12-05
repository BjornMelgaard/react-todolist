class Project < ApplicationRecord
  belongs_to :user
  has_many :tasks, -> { order('tasks.position') }, dependent: :destroy

  validates :name, presence: true, uniqueness: { case_sensitive: false }
  validates :user, presence: true
end
