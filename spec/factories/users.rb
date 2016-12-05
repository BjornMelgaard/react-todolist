require 'faker'

FactoryGirl.define do
  password = Faker::Internet.password

  factory :user do
    email                 { Faker::Internet.email }
    password              { password }
    password_confirmation { password }
  end
end
