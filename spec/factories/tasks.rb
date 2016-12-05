FactoryGirl.define do
  factory :task do
    done false
    name { Faker::Lorem.sentence }
  end

  factory :invalid_task, class: 'Task' do
    name nil
  end

  factory :task_done, class: 'Task' do
    done true
  end
end
