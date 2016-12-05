require 'rails_helper'

RSpec.describe Comment, type: :model do
  it { should belong_to :task }
  it { should have_many :attachments }
  it { should respond_to :text }
  it { should validate_presence_of :text }
  it { should validate_presence_of :task }
end
