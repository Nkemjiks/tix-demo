User.create!(
  name: "Jane Doe",
  email: "janedoes@email.com",
  password: "testing",
)

5.times do |i|
  Event.create(
    name: "Event #{i + 1}",
    paid: "false",
    active: true,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    registration_from: Time.utc(2020, 6, 17),
    registration_to: Time.utc(2020, 8, 20),
    date: Time.utc(2020, 8, 22),
    user_id: 1,
  )
end
puts "5 free events created"

3.times do |i|
  Event.create(
    name: "Event #{i + 6}",
    paid: true,
    cost: 2000,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    registration_from: Time.utc(2020, 6, 17),
    registration_to: Time.utc(2020, 7, 12),
    date: Time.utc(2020, 8, 22),
    user_id: 1,
  )
end
puts "3 paid events created"
