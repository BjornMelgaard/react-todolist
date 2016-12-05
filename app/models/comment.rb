class Comment < ApplicationRecord
  belongs_to :task
  has_many :attachments, dependent: :destroy

  validates :text, presence: true
  validates :task, presence: true
end
