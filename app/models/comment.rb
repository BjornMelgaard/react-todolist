class Comment < ApplicationRecord
  belongs_to :task
  has_many   :attachments, dependent: :destroy
  has_one    :user, through: :task

  validates :text, presence: true
  validates :task, presence: true
end
