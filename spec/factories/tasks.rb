FactoryGirl.define do
  factory :task do
    done false
    name { Faker::Lorem.sentence }
    project

    factory :invalid_task do
      name nil
    end

    factory :task_done do
      done true
    end
  end
end
