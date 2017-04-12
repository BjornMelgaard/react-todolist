class Attachment < ApplicationRecord
  belongs_to :comment, optional: true
  has_one    :user, through: :comment

  mount_uploader :file, FileUploader
  validates :file, presence: true
end
