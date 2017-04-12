FactoryGirl.define do
  FactoryGirl.define do
    factory :project do
      name { Faker::Lorem.sentence }
      user

      factory :invalid_project do
        name nil
      end
    end
  end
end
