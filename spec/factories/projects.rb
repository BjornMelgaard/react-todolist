FactoryGirl.define do
  FactoryGirl.define do
    factory :project do
      name { Faker::Lorem.sentence }
    end

    factory :invalid_project, class: 'Project' do
      name nil
    end
  end
end
