require 'rails_helper'

RSpec.describe Task, type: :model do
  let!(:user) { create(:user) }
  let!(:project) { create(:project, user_id: user.id) }

  it { should belong_to :project }
  it { should have_many :comments }
  it { should validate_presence_of :project }
  it { should respond_to :done }
  it { should respond_to :name }
  it { should respond_to :position }
  it { should respond_to :deadline }
  it { should validate_presence_of :name }
end
