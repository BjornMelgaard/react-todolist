require 'rails_helper'
require 'cancan/matchers'

RSpec.describe Ability, type: :model do
  subject(:ability) { Ability.new(user) }
  let(:user)        { create(:user) }
  let(:project)     { create(:project, user: user) }
  let(:task)        { create(:task, project: project) }
  let(:comment)     { create(:comment, task: task) }
  let(:attachment)  { create(:attachment, comment: comment) }

  it { should_not be_able_to(:manage, create(:project)) }
  it { should be_able_to(:manage, project) }
  it { should be_able_to(:manage, task) }
  it { should be_able_to(:manage, comment) }
  it { should be_able_to(:manage, attachment) }
end
