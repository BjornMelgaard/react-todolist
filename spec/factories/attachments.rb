FactoryGirl.define do
  factory :attachment do
    file { Rack::Test::UploadedFile.new("#{Rails.root}/spec/factories/attachments.rb") }
  end

  factory :invalid_attachment, class: 'Attachment' do
    file nil
  end
end
