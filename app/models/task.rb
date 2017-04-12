class Task < ApplicationRecord
  belongs_to :project
  has_many   :comments, -> { order(created_at: :asc) }, dependent: :destroy
  has_one    :user, through: :project

  acts_as_list scope: :project

  validates :name, presence: true
  validates :name, uniqueness: { case_sensitive: false, scope: :project_id }
  validates :project, presence: true

  def move_by_delta(delta)
    return if delta.zero?
    owner_tasks = project.tasks
    orig_index = owner_tasks.find_index(self)
    new_index = orig_index + delta
    replase = owner_tasks[new_index]
    unless replase
      raise ArgumentError, "#{delta} is beyond the range of tasks scope" \
        "(new index is #{new_index}, scope length is #{owner_tasks.length})"
    end
    new_position = replase.position
    set_list_position(new_position)
  end
end
