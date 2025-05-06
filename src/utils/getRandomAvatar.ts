export function getRandomAvatar(): string {
  const totalAvatars = 12;

  const randomAvatar = Math.floor(Math.random() * totalAvatars) + 1;

  return `/images/avatars/avatar-${randomAvatar}.svg`;
}
