class Ability
  include CanCan::Ability

  def initialize(user)
    can :manage, Project,    user: user
    can :manage, Task,       user: user
    can :manage, Comment,    user: user
    can :manage, Attachment, user: user
  end
end
