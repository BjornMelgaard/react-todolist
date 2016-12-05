class Attachment < ApplicationRecord
  belongs_to :comment, optional: true

  mount_uploader :file, FileUploader
  validates_presence_of :file
end
