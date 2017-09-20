<template>
  <form class="add" >
    <div class="add-fields cf">
      <div class="form-item">
        <label class="form-label">Email</label>
        <input class="form-input" type="text" placeholder="admin@vuejs.com" />
      </div>
      <div class="form-item">
        <label class="form-label">Password</label>
        <input class="form-input" type="text" />
      </div>
    </div>
    <div class="add-fields cf">
      <div class="form-item">
        <label class="form-label">Name</label>
        <input class="form-input" type="password" />
      </div>
      <div class="form-item">
        <label class="form-label">Role</label>
        <input class="form-input" type="text" />
      </div>
    </div>
    <button type="submit" class="add-button">&plus;</button>
  </form>
</template>