class CommentSerializer < ActiveModel::Serializer
  attributes :id, :text

  has_many :attachments
end
