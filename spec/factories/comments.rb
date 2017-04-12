FactoryGirl.define do
  factory :comment do
    task
    text { Faker::Lorem.paragraph }

    factory :invalid_comment do
      text nil
    end
  end
end
