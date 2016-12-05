FactoryGirl.define do
  FactoryGirl.define do
    factory :comment do
      text { Faker::Lorem.paragraph }
    end

    factory :invalid_comment, class: 'Comment' do
      text nil
    end
  end
end
